# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-evaluate
pkgver=20181025
pkgrel=1
arch=(any)
license=('MIT')
builddepends=('nodejs'
              'npm'
	      'python2'
	      'make'
	      'gcc'
	      'git'
	      'mosquitto-ropieee')
options=('!strip')
#source=('remote::git://github.com/RoPieee/ropieee-remote.git#branch=master')
#source=('ropieee-remote_checkout::git+ssh://git@bitbucket.org/spockfish/ropieee-extension-new.git#branch=master')
source=('app.js'
        'logger.js'
	'ropieee-evaluate.install'
	'ropieee-evaluate.service'
        'package.json')	
md5sums=()
install=${pkgname}.install





build() {
echo "build"
   cd ${srcdir}/ropieee-remote_checkout
   rm -rf node_modules
   npm --verbose --production install
}

package() {
echo "package"

   install -d "${pkgdir}/opt/RoPieee/evaluate"
   install -d "${pkgdir}/etc/systemd/system"
pwd
   cp -R "${srcdir}/ropieee-remote_checkout/node_modules"                    "${pkgdir}/opt/RoPieee/evaluate"
   install -m0644 "ropieee-remote_checkout/packaging/ropieee-remote.service" "${pkgdir}/etc/systemd/system"
   install -m0644 "ropieee-remote_checkout/app.js"                           "${pkgdir}/opt/RoPieee/evaluate/app.js"
   install -m0644 "ropieee-remote_checkout/log.js"                           "${pkgdir}/opt/RoPieee/evaluate/log.js"
   install -m0644 "ropieee-remote_checkout/package.json"                     "${pkgdir}/opt/RoPieee/evaluate/package.json"
}
