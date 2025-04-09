export const descriptions = {
  Normal: {
    about:
      "A normal chest radiograph represents healthy pulmonary anatomy, where lung fields appear clear, heart and diaphragm borders are distinct, and there are no pathological opacities or structural abnormalities. This serves as a baseline for comparison with abnormal conditions.",
    signs:
      "Clear and symmetrical lung fields, sharp costophrenic and cardiophrenic angles, distinct cardiac and diaphragmatic silhouettes, normal vascular markings.",
    deepLearningInsights:
      "Deep learning models use edge detection and symmetry analysis to recognize the absence of anomalies. Feature maps focus on high-contrast borders and evenly distributed texture patterns, helping to differentiate from pathological images.",
    visualPatterns:
      "Uniform grayscale texture, no abnormal density, clear margins, no asymmetry in lung zones.",
  },
  "Viral Pneumonia": {
    about:
      "Viral pneumonia is a lung infection caused by viruses, leading to inflammation and damage in the alveoli. The radiographic appearance may be subtle early on but can progress to show diffuse or focal opacities, primarily in the lower zones. Unlike bacterial pneumonia, viral cases often show bilateral involvement and ground-glass opacities.",
    signs:
      "Patchy or diffuse increased opacities, especially in lower lobes; bilateral infiltrates, air bronchograms, and ground-glass patterns.",
    deepLearningInsights:
      "Models trained on viral pneumonia datasets learn to detect texture anomalies and irregular opacities across lung fields. Attention mechanisms help localize subtle ground-glass appearances and distinguish from bacterial infections.",
    visualPatterns:
      "Non-homogeneous hazy opacities, reticular patterns, bilateral lung involvement with cloud-like textures.",
  },
  Lung_Opacity: {
    about:
      "This category often includes radiological findings from chronic infections like Tuberculosis (TB). TB primarily affects the upper lobes and may cause structural lung damage, such as cavitations and fibrosis. Radiographs exhibit focal or diffuse opacities, which can overlap with malignancies or other chronic diseases.",
    signs:
      "Upper lobe predominant opacities, cavitary lesions, fibrotic bands, volume loss, calcified granulomas, and nodular patterns.",
    deepLearningInsights:
      "Yolo Deeplearning trained on TB datasets detect complex visual signatures such as cavitation edges, calcifications, and fibrotic textures. These models leverage hierarchical feature extraction to isolate region-specific abnormalities.",
    visualPatterns:
      "Dense upper lobe opacities, hollow cavities with thick walls, linear fibrotic streaks, and speckled nodules.",
  },
};
