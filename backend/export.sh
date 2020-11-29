
# install the client library
npm install --save @google-cloud/language

# service account export
## Linux or macOS
export GOOGLE_APPLICATION_CREDENTIALS=".\GG backend-f3438741cdfc.json"
## Windows PowerShell
# $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\소영\Desktop\gg_project\GG backend-f3438741cdfc.json"
## Windows prompt
# set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\소영\Desktop\gg_project\GG backend-f3438741cdfc.json"


# install google cloud SDK
# Linux
# curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-318.0.0-linux-x86.tar.gz 
# ./google-cloud-sdk/install.sh
# ./google-cloud-sdk/install.sh --help
# ./google-cloud-sdk/bin/gcloud init

# gcloud auth application-default print-access-token

