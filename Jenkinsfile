pipeline {
  agent any
  stages {
    stage('Ckeckout Code') {
      steps {
        git(url: 'https://github.com/mauriwt/cliente_base_nova', branch: 'master')
      }
    }

    stage('Logs') {
      parallel {
        stage('Logs') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Test Unit') {
          steps {
            sh 'npm i && npm run unit:test'
          }
        }

      }
    }

  }
}