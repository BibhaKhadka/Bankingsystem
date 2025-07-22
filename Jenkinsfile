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
          // If you have Jest or Mocha configured for tests
          bat 'npm test'
        }
      }
    }

    // Optional: only if you want to keep the app running on Jenkins (usually not done)
    // stage('Backend: Run App') {
    //   steps {
    //     dir("${BACKEND_DIR}") {
    //       bat 'npm start'
    //     }
    //   }
    // }
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
