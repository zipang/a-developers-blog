---
id: appimages-and-desktop-integration
title: AppImages and Desktop integration
author: zipang
author_title: Freelance Fullstack Developer
author_url: https://github.com/zipang
author_image_url: https://avatars3.githubusercontent.com/u/658082?s=460&v=4
tags:
  - linux
  - appimage
  - integration
---

# Universal Applications installation and integration (appImage)

## Installation

Download the appImage in a specific folder suitable for all manually installed apps.
For instance :

```bash
/usr/local/bin
```

## Desktop Integration

This step is to provide a launcher for the AppImage.

In most linux flavors, this step can be done by creating a .desktop file describing the application.

Here is a basic `.desktop` file template that can be used for the most frequent and basic usages !

```toml
[Desktop Entry]
Name=XXXXXXX
Comment=This is a very usefull app
GenericName=Something generic, like : 'Text Editor' or 'FTP client'
Exec=env VAR1=VAL1 /path/to/app.appImage
Icon=/path/to/some/icon.png
Type=Application
Categories=Utility;TextEditor;Development;IDE;
Keywords=more;comma;separated;keywords;
```

If you want more desktop files examples, list the directory of the `/usr/share/applications` and cat the content of the applications that would be a good model for yours.

When you have found a good template (for example : an application that belongs to the same category as the appImage you want to add), copy it into the `~/.local/share/applications` directory and edit it more or less like this :

```bash
cd /usr/share/applications
cp filezilla.desktop ~/.local/share/applications/my-app.desktop
cd ~/.local/share/applications
nano my-app.desktop
```
