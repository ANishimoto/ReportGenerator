FROM centos:7

RUN curl -sL https://rpm.nodesource.com/setup_20.x | bash -
RUN yum clean all
RUN yum makecache fast
RUN yum install -y gcc-c++ make
RUN yum install -y nodejs

RUN yum install -y alsa-lib.x86_64
RUN yum install -y atk.x86_64
RUN yum install -y cups-libs.x86_64
RUN yum install -y gtk3.x86_64
RUN yum install -y ipa-gothic-fonts
RUN yum install -y libXcomposite.x86_64
RUN yum install -y libXcursor.x86_64
RUN yum install -y libXdamage.x86_64
RUN yum install -y libXext.x86_64
RUN yum install -y libXi.x86_64
RUN yum install -y libXrandr.x86_64
RUN yum install -y libXScrnSaver.x86_64
RUN yum install -y libXtst.x86_64
RUN yum install -y pango.x86_64
RUN yum install -y xorg-x11-fonts-100dpi
RUN yum install -y xorg-x11-fonts-75dpi
RUN yum install -y xorg-x11-fonts-cyrillic
RUN yum install -y xorg-x11-fonts-misc
RUN yum install -y xorg-x11-fonts-Type1
RUN yum install -y xorg-x11-utils

RUN yum install -y https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox-0.12.6-1.centos7.x86_64.rpm

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]