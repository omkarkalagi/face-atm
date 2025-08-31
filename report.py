import os
from typing import Dict, List
import warnings

import numpy as np

# Use non-interactive backend for headless environments
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.preprocessing import LabelEncoder, label_binarize
from sklearn.metrics import (
    confusion_matrix,
    accuracy_score,
    f1_score,
    roc_curve,
    auc,
)
from sklearn.model_selection import StratifiedKFold, learning_curve
from sklearn.exceptions import FitFailedWarning
from sklearn.svm import SVC
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.calibration import calibration_curve


REPORTS_DIR = "reports"
OUTPUT_DIR = "output"
EMBEDDINGS_PKL = os.path.join(OUTPUT_DIR, "embeddings.pickle")


def ensure_reports_dir() -> None:
    os.makedirs(REPORTS_DIR, exist_ok=True)


def save_fig(path: str, tight: bool = True) -> None:
    if tight:
        plt.tight_layout()
    plt.savefig(path, dpi=180)
    plt.close()


def load_embeddings():
    if not os.path.exists(EMBEDDINGS_PKL):
        return None, None
    import pickle
    with open(EMBEDDINGS_PKL, "rb") as f:
        data = pickle.load(f)
    X = np.array(data.get("embeddings", []))
    y_names = np.array(data.get("names", []))
    if X.size == 0 or y_names.size == 0:
        return None, None
    return X, y_names


def evaluate_model_with_cv(X: np.ndarray, y_names: np.ndarray) -> Dict[str, float]:
    results: Dict[str, float] = {}
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_names)
    classes = np.arange(len(label_encoder.classes_))

    _, class_counts = np.unique(y, return_counts=True)
    min_per_class = int(class_counts.min())
    if min_per_class < 2:
        return {"note": "Insufficient samples per class for cross-validation."}
    n_splits = min(5, min_per_class)

    cv = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
    clf = SVC(C=1.0, kernel="linear", probability=True, random_state=42)

    y_true_all: List[int] = []
    y_pred_all: List[int] = []
    y_proba_all: List[np.ndarray] = []

    for train_idx, test_idx in cv.split(X, y):
        clf.fit(X[train_idx], y[train_idx])
        y_pred = clf.predict(X[test_idx])
        y_proba = clf.predict_proba(X[test_idx])
        y_true_all.extend(y[test_idx].tolist())
        y_pred_all.extend(y_pred.tolist())
        y_proba_all.append(y_proba)

    y_true = np.array(y_true_all)
    y_pred = np.array(y_pred_all)
    y_proba = np.vstack(y_proba_all) if len(y_proba_all) > 0 else None

    results["cv_accuracy"] = float(accuracy_score(y_true, y_pred))
    results["cv_f1_macro"] = float(f1_score(y_true, y_pred, average="macro"))
    results["cv_splits"] = float(n_splits)

    # Confusion Matrix
    cm = confusion_matrix(y_true, y_pred, labels=np.arange(len(classes)))
    plt.figure(figsize=(max(6, 0.6 * len(classes)), max(4, 0.6 * len(classes))))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_)
    plt.title("Confusion Matrix (Stratified CV)")
    plt.xlabel("Predicted")
    plt.ylabel("True")
    save_fig(os.path.join(REPORTS_DIR, "confusion_matrix.png"))

    # Micro-averaged ROC
    if y_proba is not None and len(classes) > 1:
        y_true_bin = label_binarize(y_true, classes=np.arange(len(classes)))
        fpr, tpr, _ = roc_curve(y_true_bin.ravel(), y_proba.ravel())
        roc_auc = auc(fpr, tpr)
        plt.figure(figsize=(5, 4))
        plt.plot(fpr, tpr, color="#d32f2f", lw=2, label=f"Micro-AUC = {roc_auc:.3f}")
        plt.plot([0, 1], [0, 1], color="gray", lw=1, linestyle="--")
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.title("Micro-averaged ROC (Stratified CV)")
        plt.legend(loc="lower right")
        save_fig(os.path.join(REPORTS_DIR, "roc_micro.png"))
        results["cv_micro_auc"] = float(roc_auc)

    return results


def plot_samples_per_class(y_names: np.ndarray) -> None:
    classes, counts = np.unique(y_names, return_counts=True)
    order = np.argsort(classes.astype(str))
    classes = classes[order]
    counts = counts[order]
    plt.figure(figsize=(max(6, 0.6 * len(classes)), 4))
    sns.barplot(x=classes.astype(str), y=counts, color="#9ccc65")
    plt.title("Samples per Class (Embeddings)")
    plt.xlabel("User ID")
    plt.ylabel("# Samples")
    plt.xticks(rotation=45, ha="right")
    save_fig(os.path.join(REPORTS_DIR, "samples_per_class.png"))


def visualize_embeddings(X: np.ndarray, y_names: np.ndarray) -> Dict[str, float]:
    stats: Dict[str, float] = {}
    if X.shape[0] < 2 or X.shape[1] < 2:
        return stats
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_names)
    class_names = label_encoder.classes_

    # PCA
    pca = PCA(n_components=2, random_state=42)
    X_pca = pca.fit_transform(X)
    evr = pca.explained_variance_ratio_
    stats["pca_var_pc1"] = float(evr[0])
    stats["pca_var_pc2"] = float(evr[1])

    plt.figure(figsize=(6, 4.5))
    palette = sns.color_palette(n_colors=len(class_names))
    for idx, name in enumerate(class_names):
        m = y == idx
        plt.scatter(X_pca[m, 0], X_pca[m, 1], s=22, alpha=0.8, label=str(name), color=palette[idx])
    plt.title("PCA (2D) of Embeddings")
    plt.xlabel("PC1")
    plt.ylabel("PC2")
    plt.legend(loc="best", fontsize=8, frameon=False)
    save_fig(os.path.join(REPORTS_DIR, "pca_scatter.png"))

    plt.figure(figsize=(5, 3.5))
    plt.bar(["PC1", "PC2"], evr, color=["#1976d2", "#43a047"]) 
    plt.ylabel("Explained Variance Ratio")
    plt.title("PCA Explained Variance (2D)")
    save_fig(os.path.join(REPORTS_DIR, "explained_variance.png"))

    # t-SNE
    n = X.shape[0]
    perplexity = max(2, min(30, n // 3))
    try:
        tsne = TSNE(n_components=2, perplexity=perplexity, learning_rate="auto", init="pca", random_state=42)
        X_tsne = tsne.fit_transform(X)
        plt.figure(figsize=(6, 4.5))
        for idx, name in enumerate(class_names):
            m = y == idx
            plt.scatter(X_tsne[m, 0], X_tsne[m, 1], s=22, alpha=0.85, label=str(name), color=palette[idx])
        plt.title(f"t-SNE (2D) of Embeddings, perplexity={perplexity}")
        plt.xlabel("tSNE-1")
        plt.ylabel("tSNE-2")
        plt.legend(loc="best", fontsize=8, frameon=False)
        save_fig(os.path.join(REPORTS_DIR, "tsne_scatter.png"))
    except Exception:
        pass

    return stats


def plot_learning_curve_from_embeddings(X: np.ndarray, y_names: np.ndarray) -> Dict[str, float]:
    stats: Dict[str, float] = {}
    if X.shape[0] < 3:
        return stats
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_names)
    _, class_counts = np.unique(y, return_counts=True)
    if class_counts.min() < 2:
        return stats
    cv = StratifiedKFold(n_splits=min(5, class_counts.min()), shuffle=True, random_state=42)
    clf = SVC(C=1.0, kernel="linear", probability=True, random_state=42)

    # Use larger minimal training fractions for tiny datasets to avoid single-class subsets
    n_samples = len(y)
    n_classes = len(np.unique(y))
    if n_samples < 30 or class_counts.min() < 5:
        train_sizes_grid = np.linspace(0.6, 1.0, 5)
    else:
        train_sizes_grid = np.linspace(0.2, 1.0, 5)

    with warnings.catch_warnings():
        warnings.simplefilter("ignore", category=FitFailedWarning)
        train_sizes, train_scores, test_scores = learning_curve(
            clf, X, y, cv=cv, train_sizes=train_sizes_grid, scoring="accuracy", error_score=np.nan
        )

    # Aggregate ignoring NaNs from failed fits
    train_mean = np.nanmean(train_scores, axis=1)
    train_std = np.nanstd(train_scores, axis=1)
    test_mean = np.nanmean(test_scores, axis=1)
    test_std = np.nanstd(test_scores, axis=1)

    plt.figure(figsize=(6, 4))
    # Mask out NaN points for plotting
    mask = ~np.isnan(train_mean) & ~np.isnan(test_mean)
    plt.plot(train_sizes[mask], train_mean[mask], "-o", color="#1976d2", label="Train")
    plt.fill_between(train_sizes[mask], train_mean[mask] - train_std[mask], train_mean[mask] + train_std[mask], alpha=0.2, color="#1976d2")
    plt.plot(train_sizes[mask], test_mean[mask], "-o", color="#d32f2f", label="CV")
    plt.fill_between(train_sizes[mask], test_mean[mask] - test_std[mask], test_mean[mask] + test_std[mask], alpha=0.2, color="#d32f2f")
    plt.title("Learning Curve (SVM on Embeddings)")
    plt.xlabel("Training examples")
    plt.ylabel("Accuracy")
    plt.legend(loc="best")
    save_fig(os.path.join(REPORTS_DIR, "learning_curve.png"))

    stats["lc_min_train_size"] = float(train_sizes[0])
    stats["lc_max_train_size"] = float(train_sizes[-1])
    if np.all(np.isnan(test_mean)):
        stats["lc_cv_best_acc"] = None
    else:
        stats["lc_cv_best_acc"] = float(np.nanmax(test_mean))
    return stats


def plot_per_class_roc_from_embeddings(X: np.ndarray, y_names: np.ndarray) -> Dict[str, float]:
    stats: Dict[str, float] = {}
    if X.shape[0] < 3:
        return stats
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_names)
    classes = np.arange(len(label_encoder.classes_))
    if len(classes) < 2:
        return stats
    _, class_counts = np.unique(y, return_counts=True)
    if class_counts.min() < 2:
        return stats

    cv = StratifiedKFold(n_splits=min(5, class_counts.min()), shuffle=True, random_state=42)
    clf = SVC(C=1.0, kernel="linear", probability=True, random_state=42)

    y_true_all: List[int] = []
    y_proba_all: List[np.ndarray] = []
    for train_idx, test_idx in cv.split(X, y):
        clf.fit(X[train_idx], y[train_idx])
        y_proba = clf.predict_proba(X[test_idx])
        y_true_all.extend(y[test_idx].tolist())
        y_proba_all.append(y_proba)
    y_true = np.array(y_true_all)
    y_proba = np.vstack(y_proba_all)

    y_true_bin = label_binarize(y_true, classes=np.arange(len(classes)))
    plt.figure(figsize=(6, 4.5))
    aucs = []
    palette = sns.color_palette(n_colors=len(classes))
    for c in classes:
        fpr, tpr, _ = roc_curve(y_true_bin[:, c], y_proba[:, c])
        roc_auc = auc(fpr, tpr)
        aucs.append(roc_auc)
        plt.plot(fpr, tpr, lw=1.5, color=palette[c], label=f"Class {label_encoder.classes_[c]} (AUC={roc_auc:.2f})")
    plt.plot([0, 1], [0, 1], color="gray", lw=1, linestyle="--")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("Per-class ROC (Stratified CV)")
    plt.legend(loc="lower right", fontsize=8)
    save_fig(os.path.join(REPORTS_DIR, "roc_per_class.png"))
    stats["roc_per_class_mean_auc"] = float(np.mean(aucs)) if aucs else None
    return stats


def plot_calibration_from_embeddings(X: np.ndarray, y_names: np.ndarray) -> Dict[str, float]:
    stats: Dict[str, float] = {}
    if X.shape[0] < 3:
        return stats
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_names)
    classes = np.arange(len(label_encoder.classes_))
    if len(classes) < 2:
        return stats
    _, class_counts = np.unique(y, return_counts=True)
    chosen_class = int(np.argmax(class_counts))
    if class_counts[chosen_class] < 2:
        return stats

    cv = StratifiedKFold(n_splits=min(5, class_counts.min()), shuffle=True, random_state=42)
    clf = SVC(C=1.0, kernel="linear", probability=True, random_state=42)

    y_true_bin_all: List[int] = []
    y_prob_pos_all: List[float] = []
    for train_idx, test_idx in cv.split(X, y):
        clf.fit(X[train_idx], y[train_idx])
        proba = clf.predict_proba(X[test_idx])[:, chosen_class]
        y_prob_pos_all.extend(proba.tolist())
        y_true_bin_all.extend((y[test_idx] == chosen_class).astype(int).tolist())

    y_true_bin = np.array(y_true_bin_all)
    y_prob_pos = np.array(y_prob_pos_all)
    if len(np.unique(y_true_bin)) < 2:
        return stats

    frac_pos, mean_pred = calibration_curve(y_true_bin, y_prob_pos, n_bins=10, strategy="uniform")
    plt.figure(figsize=(5.5, 4))
    plt.plot(mean_pred, frac_pos, "-o", color="#0288d1", label="SVM (one-vs-rest)")
    plt.plot([0, 1], [0, 1], "--", color="gray", label="Perfectly calibrated")
    plt.xlabel("Mean predicted probability")
    plt.ylabel("Fraction of positives")
    plt.title(f"Calibration Curve (class = {label_encoder.classes_[chosen_class]})")
    plt.legend(loc="best")
    save_fig(os.path.join(REPORTS_DIR, "calibration_curve.png"))
    return stats


def write_summary_file(sections: Dict[str, Dict]) -> None:
    path = os.path.join(REPORTS_DIR, "summary.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write("Face ATM - ML Report\n")
        f.write("=" * 40 + "\n\n")
        for name, metrics in sections.items():
            f.write(f"[{name}]\n")
            if not metrics:
                f.write("No data available.\n\n")
                continue
            for k in sorted(metrics.keys()):
                f.write(f"- {k}: {metrics[k]}\n")
            f.write("\n")


def main() -> None:
    ensure_reports_dir()
    sns.set(style="whitegrid")

    X, y_names = load_embeddings()
    if X is None or y_names is None:
        print("No embeddings found. Train the model first.")
        return

    sections: Dict[str, Dict] = {}

    # Samples per class
    plot_samples_per_class(y_names)

    # Evaluation and ML visualizations
    sections["model_cv"] = evaluate_model_with_cv(X, y_names)
    sections["embeddings_viz"] = visualize_embeddings(X, y_names)
    sections["learning_curve"] = plot_learning_curve_from_embeddings(X, y_names)
    sections["roc_per_class"] = plot_per_class_roc_from_embeddings(X, y_names)
    sections["calibration"] = plot_calibration_from_embeddings(X, y_names)

    write_summary_file(sections)

    print("ML report generated in 'reports/' directory:")
    for fname in sorted(os.listdir(REPORTS_DIR)):
        print(" -", os.path.join(REPORTS_DIR, fname))


if __name__ == "__main__":
    main()


