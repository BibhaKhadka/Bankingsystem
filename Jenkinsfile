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
          bat 'npm install -D serve'
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
          bat 'npm install --save-dev cross-env'
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

    stage('Approval: Deploy to Staging?') {
      steps {
        script {
          input message: 'Proceed to staging deployment?', ok: 'Yes'
        }
      }
    }

    stage('Deploy to Staging VM') {
      steps {
        bat """
          "\"C:\\Program Files\\Git\\bin\\bash.exe\" -c \\"ssh -o StrictHostKeyChecking=no bibha@192.168.1.73 'pkill -f \\\\\\"npm run start:staging\\\\\\" || true && pkill -f \\\\\\"serve -s build\\\\\\" || true && cd Bankingsystem && git pull origin master && cd backend && npm install && nohup npm run start:staging > backend.log 2>&1 & cd ../frontend && npm install && npm run build && nohup serve -s build -l 3000 > frontend.log 2>&1 &'\\"
        """
      }
    }

    stage('Approval: Deploy to Production?') {
      steps {
        script {
          input message: 'Proceed to production deployment?', ok: 'Yes, Deploy to Production'
        }
      }
    }

    stage('Deploy to Production VM') {
      steps {
        bat """
          "\"C:\\Program Files\\Git\\bin\\bash.exe\" -c \\"ssh -o StrictHostKeyChecking=no bibha@192.168.1.74 'pkill -f \\\\\\"npm run start:prod\\\\\\" || true && pkill -f \\\\\\"serve -s build\\\\\\" || true && cd Bankingsystem && git pull origin master && cd backend && npm install && nohup npm run start:prod > backend.log 2>&1 & cd ../frontend && npm install && npm run build:prod && nohup serve -s build -l 80 > frontend.log 2>&1 &'\\"
        """
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}
