pipeline {
  agent any

  environment {
    NODE_VERSION = '18.x'
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
    PYTHON_VERSION = '3.10'
  }

  tools {
    nodejs "NodeJS_18"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'master', url: 'https://github.com/BibhaKhadka/Bankingsystem.git'
      }
    }

    stage('Frontend: Install Dependencies') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat 'npm install'
        }
      }
    }

    stage('Frontend: Build') {
      steps {
        dir("${FRONTEND_DIR}") {
          bat 'npm run build'
        }
      }
    }

    stage('Backend: Install Dependencies') {
      steps {
        dir("${BACKEND_DIR}") {
          bat '''
          python -m venv venv
          call venv\\Scripts\\activate.bat
          pip install -r requirements.txt
          '''
        }
      }
    }

    stage('Backend: Run Tests or Start') {
      steps {
        dir("${BACKEND_DIR}") {
          bat '''
          call venv\\Scripts\\activate.bat
          echo Backend is ready
          REM Optionally run: python app.py
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
