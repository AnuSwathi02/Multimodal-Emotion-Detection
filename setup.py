#!/usr/bin/env python3
"""
Setup script for Video Sentiment Analyzer Project
This script helps install all required dependencies and set up the project.
"""

import subprocess
import sys
import os

def install_requirements():
    """Install all required packages from requirements.txt"""
    print("Installing Python dependencies...")
    
    # Try minimal requirements first
    print("Installing core dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements-minimal.txt"])
        print("✅ Core dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install core dependencies: {e}")
        return False
    
    # Try full requirements
    print("Installing additional dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ All Python dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"⚠️  Some optional dependencies failed to install: {e}")
        print("Core functionality should still work. You can install missing packages manually if needed.")
        return True

def install_frontend_dependencies():
    """Install frontend dependencies"""
    frontend_dir = "sentiment-analyzer-frontend"
    if os.path.exists(frontend_dir):
        print("Installing frontend dependencies...")
        try:
            subprocess.check_call(["npm", "install"], cwd=frontend_dir)
            print("✅ Frontend dependencies installed successfully!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to install frontend dependencies: {e}")
            return False
    else:
        print("⚠️  Frontend directory not found, skipping frontend setup")
        return True

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    return True

def main():
    """Main setup function"""
    print("🚀 Setting up Video Sentiment Analyzer Project...")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install Python dependencies
    if not install_requirements():
        print("\n❌ Setup failed during Python dependency installation")
        sys.exit(1)
    
    # Install frontend dependencies
    if not install_frontend_dependencies():
        print("\n❌ Setup failed during frontend dependency installation")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("🎉 Setup completed successfully!")
    print("\nNext steps:")
    print("1. Start the ML backend: python ml_backend_enhanced.py")
    print("2. Start the frontend: cd sentiment-analyzer-frontend && npm run dev")
    print("3. Open http://localhost:3000 in your browser")

if __name__ == "__main__":
    main()
