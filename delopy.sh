prefix=$2
msg=$1
moment=`date +%Y%m%d%H%M`
version=${prefix:-'test_v'}
git add .
git commit -m $msg --no-verify
git push
#list=`git describe --match "receiving_clientv*" --abbrev=0 --tags $(git rev-list --tags --max-count=1)`
#version=${list:17}
tagName=$version$moment
git tag $tagName
git push origin $tagName
sleep 1000
