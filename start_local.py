#!/usr/bin/env python3
"""
Simple startup script for Video Sentiment Analyzer (Local Access Only)
"""

import subprocess
import os
import sys
import time

def run_command(cmd, cwd=None, shell=False):
    """Run a command and return the process"""
    print(f"Executing: {' '.join(cmd) if isinstance(cmd, list) else cmd}")
    process = subprocess.Popen(cmd, cwd=cwd, shell=shell, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    return process

def stream_output(process, prefix=""):
    """Stream output from a process"""
    for line in process.stdout:
        print(f"[{prefix}] {line.strip()}")

if __name__ == "__main__":
    project_root = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(project_root, "sentiment-analyzer-frontend")

    print("🚀 Starting Video Sentiment Analyzer (Local Access Only)...")

    # Step 1: Start ML Backend
    print("\n--- Starting ML Backend ---")
    backend_cmd = [sys.executable, "ml_backend_enhanced.py"]
    backend_process = run_command(backend_cmd, cwd=project_root)
    print("ML Backend started. Waiting a few seconds for it to initialize...")
    time.sleep(5)

    # Step 2: Start Frontend
    print("\n--- Starting Frontend (Next.js) ---")
    frontend_cmd = ["npm", "run", "dev"]
    frontend_process = run_command(frontend_cmd, cwd=frontend_dir, shell=True)
    print("Frontend started. Waiting a few seconds for it to initialize...")
    time.sleep(5)

    print("\n--- Application Started ---")
    print("🌐 Frontend: http://localhost:3000")
    print("🔧 Backend API: http://localhost:5000")
    print("❤️ Health Check: http://localhost:5000/health")
    print("\n📱 Access the application at: http://localhost:3000")
    print("Press Ctrl+C to stop both services...")

    # Stream outputs
    import threading
    backend_thread = threading.Thread(target=stream_output, args=(backend_process, "BACKEND"))
    frontend_thread = threading.Thread(target=stream_output, args=(frontend_process, "FRONTEND"))

    backend_thread.start()
    frontend_thread.start()

    try:
        backend_thread.join()
        frontend_thread.join()
    except KeyboardInterrupt:
        print("\nShutting down services...")
        backend_process.terminate()
        frontend_process.terminate()
        backend_process.wait()
        frontend_process.wait()
        print("Services stopped.")
