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
          bat 'npm install -D serve' // Ensure serve installed for staging serve
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
          bat 'npm install --save-dev cross-env' // Ensure cross-env installed
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

    stage('Approval: Proceed to Staging and Build?') {
      steps {
        script {
          input message: 'Do you want to proceed to Staging and Build?', ok: 'Yes, Proceed'
        }
      }
    }

    stage('Deploy to Staging') {
      steps {
        echo 'Deploying backend to staging...'
        dir("${BACKEND_DIR}") {
          bat 'npm run start:staging' // Start backend in staging mode
        }
        echo 'Serving frontend staging build...'
        dir("${FRONTEND_DIR}") {
          bat 'npm run serve:staging'  // Serve frontend staging build
        }
      }
    }

    stage('Final Build') {
      steps {
        echo 'Running final production build...'
        // Add any final production build steps here
      }
    }
  }

  post {
    success {
      echo 'Pipeline succeeded!'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}
