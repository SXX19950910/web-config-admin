#rm -rf dist/*
#rm -rf yarn.lock
yarn install
npm run build

if [[ $? != 0 ]]; then
  echo 'npm build fail .'
  exit 2
fi
