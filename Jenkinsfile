pipeline {
  agent any

  environment {
    NODE_VERSION = '18.x'
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
    PYTHON_VERSION = '3.10' // optional for readability
  }

  tools {
    nodejs "NodeJS_18" // Jenkins tool name
    // Optional: python "Python_3.10" (if configured in Jenkins Tools)
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/BibhaKhadka/Bankingsystem.git'
      }
    }

    stage('Frontend: Install Dependencies') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh 'npm install'
        }
      }
    }

    stage('Frontend: Build') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh 'npm run build'
          // sh 'npm run export' // if you're exporting static site
        }
      }
    }

    stage('Backend: Install Dependencies') {
      steps {
        dir("${BACKEND_DIR}") {
          // Ensure pip is available and virtualenv if needed
          sh '''
            python3 -m venv venv
            . venv/bin/activate
            pip install -r requirements.txt
          '''
        }
      }
    }

    stage('Backend: Run Tests or Start') {
      steps {
        dir("${BACKEND_DIR}") {
          // Run tests or simulate server start (e.g., Flask or FastAPI)
          sh '''
            . venv/bin/activate
            echo "Backend is ready"
            # Optional: python app.py or uvicorn main:app
          '''
        }
      }
    }
  }

  post {
    success {
      echo 'Build and backend integration succeeded!'
    }
    failure {
      echo 'Build or backend integration failed.'
    }
  }
}
