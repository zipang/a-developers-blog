---
id: changing-the-file-manager
title: Replacing the default file manager of your Ubuntu distro
author: zipang
author_title: Freelance Fullstack Developer
author_url: https://github.com/zipang
author_image_url: https://avatars3.githubusercontent.com/u/658082?s=460&v=4
tags:
    - linux
    - caja
    - file-manager
---

In this post, i will examine the process of replacing the default file manager provided by your new distribution with another one.

As you move between linux distros and from one window manager to the other.. there is allways a lot of things that you'd want to keep from you old distro.

In this example i will take the example of something that is really central and crucial to your day to day productivity : the file manager.

Recent window managers like GNOME, CINNAMON or even XFCE have a corpus of basic utilities : the text editor, the package manager, the settings .. all usually being forks of a precedent incarnation.

In my opinion, Caja is near the perfect incarnation of a file manager coming to its perfect incarnation more than 20 years after its initial release.

## First steps :

Install Caja and its various extensions :

```bash
sudo apt install caja caja-common caja-extensions-common
sudo apt install caja-open-terminal
sudo apt install caja-wallpaper
sudo apt install caja-xattr-tags
sudo apt install caja-rename
sudo apt install caja-image-converter
```

Then, if everything looks fine, it's time to make caja the default file manager by associating it to the MIME type associated to system files and folder

```bash
xdg-mime default caja.desktop inode/directory application/x-gnome-saved-search
```

References :
[https://www.linuxuprising.com/2018/07/how-to-replace-nautilus-with-nemo-file.html](How To Replace Nautilus With Nemo File Manager On Ubuntu Or Pop!\_OS Gnome Desktop)
