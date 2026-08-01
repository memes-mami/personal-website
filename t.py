import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm

# Set seaborn style
sns.set(style="whitegrid")

# Reproducibility
np.random.seed(42)

# Define more diverse distributions and parameter variants
distribution_variants = {
    "Normal (μ=0, σ=1)": np.random.normal(0, 1, 1000),
    "Normal (μ=5, σ=2)": np.random.normal(5, 2, 1000),
    "Exponential (λ=1)": np.random.exponential(1, 1000),
    "Exponential (λ=0.5)": np.random.exponential(2, 1000),
    "Uniform (0,1)": np.random.uniform(0, 1, 1000),
    "Uniform (-2,2)": np.random.uniform(-2, 2, 1000),
    "Chi-squared (df=2)": np.random.chisquare(df=2, size=1000),
    "Chi-squared (df=10)": np.random.chisquare(df=10, size=1000),
    "Beta (a=0.5, b=0.5)": np.random.beta(0.5, 0.5, 1000),
    "Beta (a=2, b=5)": np.random.beta(2, 5, 1000),
    "Log-Normal (μ=0, σ=0.5)": np.random.lognormal(0, 0.5, 1000),
    "Log-Normal (μ=0, σ=1.5)": np.random.lognormal(0, 1.5, 1000),
    "t-distribution (df=2)": np.random.standard_t(df=2, size=1000),
    "t-distribution (df=10)": np.random.standard_t(df=10, size=1000)
}

# Display one distribution at a time
for name, data in distribution_variants.items():
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    fig.suptitle(f"{name}", fontsize=16)

    # Histogram + KDE
    sns.histplot(data, kde=True, ax=axes[0], bins=30, color="skyblue", edgecolor='black')
    axes[0].set_title("Histogram + KDE")

    # Q–Q plot against normal
    sm.qqplot(data, line='45', ax=axes[1])
    axes[1].set_title("Q–Q Plot (vs Normal)")

    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.show()
