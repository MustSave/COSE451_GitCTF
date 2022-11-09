# echo kernel.randomize_va_space=0 | sudo tee /etc/sysctl.d/01-disable-aslr.conf
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
# echo fs.protected_symlinks=0 | sudo tee /etc/sysctl.d/01-disable-symlink.conf
echo 0 | sudo tee /proc/sys/fs/protected_symlinks