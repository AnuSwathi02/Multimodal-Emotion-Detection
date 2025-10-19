@echo off
echo ========================================
echo   Multimodal Emotion Recognition
echo   Visualization Generator
echo ========================================
echo.

echo [1/3] Installing required packages...
pip install matplotlib seaborn pandas numpy scikit-learn
echo.

echo [2/3] Generating basic visualizations...
python paper_figures.py
echo.

echo [3/3] Generating advanced visualizations...
python advanced_visualizations.py
echo.

echo ========================================
echo   All visualizations generated successfully!
echo ========================================
echo.
echo Generated files:
echo - 20 high-quality PNG files in 'figures/' directory
echo - HTML viewer: view_visualizations.html
echo - Documentation: visualization_summary.md
echo.
echo To view visualizations:
echo 1. Open 'figures/' folder in File Explorer
echo 2. Open 'view_visualizations.html' in your browser
echo.
pause
