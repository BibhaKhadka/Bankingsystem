pipeline {
  agent any

  environment {
    NODE_VERSION = '18.x'
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
    PYTHON_VERSION = '3.10' // Just a note, not used directly here
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
          bat '''
          set CI=false
          npm run build
          '''
        }
      }
    }

    stage('Backend: Install Dependencies') {
      steps {
        dir("${BACKEND_DIR}") {
          bat '''
          if not exist venv\\Scripts\\activate.bat (
            python -m venv venv
          )
          call venv\\Scripts\\activate.bat
          pip install --upgrade pip
          pip install -r requirements.txt
          '''
        }
      }
    }

    stage('Backend: Run Tests') {
      steps {
        dir("${BACKEND_DIR}") {
          bat '''
          call venv\\Scripts\\activate.bat
          python -m unittest discover
          '''
        }
      }
    }

    stage('Backend: Run App') {
      steps {
        dir("${BACKEND_DIR}") {
          bat '''
          call venv\\Scripts\\activate.bat
          REM python app.py
          '''
        }
      }
    }
  }

  post {
    success {
      echo 'Build, test, and backend integration succeeded!'
    }
    failure {
      echo 'Build, test, or backend integration failed.'
    }
  }
}
