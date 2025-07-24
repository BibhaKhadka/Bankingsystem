pipeline {
  agent any

  stages {
    stage('Checkout SCM') {
      steps {
        checkout scm
      }
    }

    stage('Frontend: Install Dependencies') {
      steps {
        dir('frontend') {
          bat 'npm install'
          bat 'npm install -D serve'
        }
      }
    }

    stage('Frontend: Build') {
      steps {
        dir('frontend') {
          bat 'set CI=false && npm run build'
        }
      }
    }

    stage('Backend: Install Dependencies') {
      steps {
        dir('backend') {
          bat 'npm install'
          bat 'npm install --save-dev cross-env'
        }
      }
    }

    stage('Backend: Build') {
      steps {
        dir('backend') {
          bat 'npx tsc'
        }
      }
    }

    stage('Backend: Run Tests') {
      steps {
        dir('backend') {
          bat 'npm test'
        }
      }
    }

    stage('Approval: Deploy to Staging?') {
      steps {
        input message: 'Proceed to staging deployment?', ok: 'Yes'
      }
    }

    stage('Deploy to Staging VM') {
      steps {
        // Adjust path to git bash if needed
        bat """
          \"C:\\Program Files\\Git\\bin\\bash.exe\" -c \\
          \"ssh -o StrictHostKeyChecking=no bibha@192.168.1.73 \\
          'pkill -f \\\\\\\"npm run start:staging\\\\\\\" || true && \\
           pkill -f \\\\\\\"serve -s build\\\\\\\" || true && \\
           cd Bankingsystem && git pull origin master && \\
           cd backend && npm install && nohup npm run start:staging > backend.log 2>&1 & && \\
           cd ../frontend && npm install && npm run build && nohup serve -s build -l 3000 > frontend.log 2>&1 &'\" 
        """
      }
    }

    stage('Approval: Deploy to Production?') {
      steps {
        input message: 'Proceed to production deployment?', ok: 'Yes'
      }
    }

    stage('Deploy to Production VM') {
      steps {
        // Similar to staging deploy but to production server
        // Replace IP and commands accordingly
        bat """
          \"C:\\Program Files\\Git\\bin\\bash.exe\" -c \\
          \"ssh -o StrictHostKeyChecking=no bibha@192.168.1.74 \\
          'pkill -f \\\\\\\"npm run start:prod\\\\\\\" || true && \\
           pkill -f \\\\\\\"serve -s build\\\\\\\" || true && \\
           cd Bankingsystem && git pull origin master && \\
           cd backend && npm install && nohup npm run start:prod > backend.log 2>&1 & && \\
           cd ../frontend && npm install && npm run build && nohup serve -s build -l 3000 > frontend.log 2>&1 &'\" 
        """
      }
    }
  }

  post {
    failure {
      echo 'Pipeline failed.'
    }
  }
}
