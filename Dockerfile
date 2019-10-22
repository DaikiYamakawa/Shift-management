FROM ubuntu:latest

# 入れないとGitをいれようとしたらTimezone選択しろって怒られる
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && \
    apt -y upgrade && \
    apt install -y \
    man \
    tree \
    curl \
    build-essential \
    gcc-multilib \
    tmux \
    wget \
    git \
    unzip \
    vim-gtk \
    zlib1g-dev \
    openssl \
    libssl-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    zsh

# zsh(prezto)
COPY env_file $HOME
RUN git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto" \
	&& ./prezto_setup.sh \
	&& chsh -s /bin/zsh \
	&& mv -b --suffix=.bak .zpreztorc /root/.zprezto/runcoms/zpreztorc \
	&& mv -b --suffix=.bak .vimrc /root/.vimrc

# python
ENV LC_ALL=C.UTF-8
RUN apt update \
    && apt install -y python3.7 python3.7-dev python3.7-distutils\
    && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py\
    && python3.7 get-pip.py \
    && pip install pipenv \
    && git clone https://github.com/pyenv/pyenv.git /root/.pyenv \
    && echo 'export PYENV_ROOT="$HOME/.pyenv"' >> /root/.zprezto/runcoms/zshenv \
    && echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> /root/.zprezto/runcoms/zshenv \
    && echo 'eval "$(pyenv init -)"' >> /root/.zprezto/runcoms/zshenv

WORKDIR /root

# Install python package
CMD ["zsh"]

# mnt
# VM のHostとのディレクトリ共有設定 https://gyazo.com/642bf109e38a9c1e5ddcb19c6c12032f
# Build
# docker run -it -v /host:/root/host -h "<Host名>" --name "<コンテナ名>" <イメージ名>
# docker exec -it <イメージ名>

# pipenvの環境変数の設定を行うこと
