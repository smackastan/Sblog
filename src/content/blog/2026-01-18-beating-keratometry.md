---
title: 'Beating Keratometry: Using NN Analysis of Corneal Topographies to Predict Axis and Power of Toric IOL Implants'
description: 'Applying convolutional neural networks to corneal topography scans to outperform traditional keratometry in surgical planning.'
pubDate: '2026-01-14'
---

## **Why this project exists**

Modern cataract surgery frequently uses **toric intraocular lenses (IOLs)** to correct corneal astigmatism. Choosing the correct **cylinder power and axis** is critical, small errors can leave patients with residual astigmatism and sub-optimal vision, which can’t be adjusted later.

Today, most toric planning still relies on **keratometry**:

`Cylinder ≈ K2 − K1`  
`Axis ≈ steep meridian`

This approach assumes the cornea behaves like a perfect toric surface. Real corneas are not perfect toroids.

Irregular astigmatism, asymmetry, higher-order shape, and measurement noise all reduce the reliability of SimK-based planning.

We asked a simple question:

Can a model learn toric IOL planning directly from the *entire corneal shape* instead of two keratometry numbers?

---

# **The dataset**

We assembled a dataset of corneal topography exams paired with real post-op refractions.

Each sample represented one eye.

### **Inputs (from topography export)**

From device exports (Oculus topographer):

* Axial curvature grid (diopters)

* SimK values and quality indices

The curvature grid is a 2D matrix representing corneal optical power.

Typical size after preprocessing:

`128 × 128 matrix of diopters`

### **Targets (ground truth)**

Only patients implanted with **non-toric IOLs**

Because no toric correction was applied, the post-op refractive cylinder represents the true residual corneal astigmatism after surgery. This makes it an ideal target for training a predictive model. It’s also important to note that these results are subjective, so the model will be targeting what the patients feel gives their best vision, not what’s mathematically perfect

---

## **Baseline: How Toric Planning Normally Works**

Before building any ML model, I implemented a baseline pipeline replicating the logic of common clinical metrics:

1. Apply a **central 3 mm mask** to the curvature map

2. Detect steep and flat meridians

3. Compute simulated keratometry (SimK)

4. Convert to predicted cylinder \+ axis

This serves as the “traditional algorithmic approach.”

(img1)

---

## **Machine Learning Approach**

Instead of reducing the cornea to two numbers, I let the model see the **entire curvature grid**.

### **Input**

* Normalized 2D curvature maps

* Resized to a fixed resolution

* Augmented with rotations and noise

### **Model Architecture**

I used a compact convolutional neural network (CNN) designed for regression.

Outputs:

* Cylinder magnitude

* Astigmatism axis (circular regression)

Training losses:

* Mean absolute error (cylinder)

* Circular angular loss (axis)

---

# **Data pipeline**

We built the entire pipeline in **Python**.

## **Tools used**

| Category | Libraries |
| ----- | ----- |
| Data ingestion | pandas, NumPy |
| DICOM parsing | pydicom |
| Image processing | OpenCV, SciPy |
| Machine learning | PyTorch |
| Evaluation | scikit-learn, SciPy |
| Visualization | Matplotlib, Seaborn |

---

## **Preprocessing steps**

Raw exams differ in size, orientation, and noise.

We standardized every corneal map.

### **1\) Centering**

Align grid to corneal apex.

### **2\) Masking**

Remove invalid pixels from tear-film artifacts.

### **3\) Resizing**

Interpolate to 128×128 resolution.

### **4\) Normalization**

Standardize diopter values.

Each eye became:

`Input: 128×128 curvature map`  
`Target: cylinder (D), axis (°)`

---

## **Evaluation Strategy**

We compared two predictions against the real post-op manifest refraction:

1. Traditional SimK prediction

2. Machine learning prediction

Metrics:

* Cylinder MAE (diopters)

* Axis circular error (degrees)

* Vector refractive error

We also created a subgroup of complex corneas, defined as:

* Low magnitude (\<1D) OR

* Asymmetric/irregular maps

---

## **Results**

### **Overall Performance**

| Metric | Traditional | ML Model |
| ----- | ----- | ----- |
| Cylinder MAE | 0.48 D | 0.38 D |
| Axis Error | 17.2° | 13.6° |

This represents a:

**20% reduction in prediction error**

(img2)

---

### **Performance in Complex Corneas**

| Metric | Traditional | ML Model |
| ----- | ----- | ----- |
| Cylinder MAE | 0.57 D | **0.37 D** |

This represents a:

**35% improvement in difficult cases**

This was the most encouraging result of the study.

(img3)

---

### **Error Distribution**

The ML model produced:

* Fewer large outliers

* Tighter error distribution

* More stable axis prediction

(img4)

---

## **Clinical Implications**

Even modest improvements matter in toric planning.

A 0.1–0.2D cylinder error reduction can:

* Improve uncorrected visual acuity

* Reduce residual refractive astigmatism

* Increase patient satisfaction

Most importantly:

The largest gains occurred where clinicians struggle most, irregular and ambiguous astigmatism.
