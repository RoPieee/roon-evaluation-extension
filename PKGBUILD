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
source=('app.js'
        'log.js'
	'ropieee-evaluate.install'
	'ropieee-evaluate.service'
        'package.json')	
md5sums=('1c2380c741b89cea441f9f7fcbed3644'
         'f5ac04f7b0758af92e5b3e2a34034840'
         'a25226c8e69f1fb3d5ff8bb68ebfc9f4'
         '36d051a2a5343a503e0ef7106a5131f3'
         '97f55b715368bd1bfa8f99cdcdc7c3c0')
install=${pkgname}.install





build() {
echo "build"

   cd ${srcdir}
   rm -rf node_modules
   npm --verbose --production install
}

package() {
echo "package"

   install -d "${pkgdir}/opt/RoPieee/evaluate"
   install -d "${pkgdir}/etc/systemd/system"
pwd
   cp -R "${srcdir}/node_modules"            "${pkgdir}/opt/RoPieee/evaluate"
   install -m0644 "ropieee-evaluate.service" "${pkgdir}/etc/systemd/system"
   install -m0644 "app.js"                   "${pkgdir}/opt/RoPieee/evaluate/app.js"
   install -m0644 "log.js"                   "${pkgdir}/opt/RoPieee/evaluate/log.js"
   install -m0644 "package.json"             "${pkgdir}/opt/RoPieee/evaluate/package.json"
}
