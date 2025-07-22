pipeline {
  agent any

  environment {
    NODE_VERSION = '18.x'
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
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
          bat 'npm install'
        }
      }
    }

    stage('Backend: Build') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npx tsc'
        }
      }
    }

    stage('Backend: Run Tests') {
      steps {
        dir("${BACKEND_DIR}") {
          bat 'npm test'
        }
      }
    }

    stage('Backend: Run App') {
      steps {
        dir("${BACKEND_DIR}") {
          bat '''
          REM Activate environment if needed (optional)
          REM call venv\\Scripts\\activate.bat
          REM Run backend app here if needed
          REM node dist/server.js
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
