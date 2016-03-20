'use babel';
'use strict';

var treeViews;

function getTreeViews() {
    setImmediate(() => {
        treeViews = [
            document.querySelector('.tree-view-resizer'),
            document.querySelector('.remote-ftp-view'),
            (function () {
                var nuclideTreeView = document.querySelector('.nuclide-file-tree');

                if (nuclideTreeView) {
                    return nuclideTreeView.closest('.nuclide-ui-panel-component');
                }
            })()
        ];
    });
}

function removeBlendingEl() {
    getTreeViews();
    treeViews.forEach((treeView) => {
        if (treeView) {
            var blendingEl = treeView.querySelector('.tabBlender');

            if (blendingEl) {
                treeView.removeChild(blendingEl);
            }
        }
    });
}

function toggleBlendTreeView(bool) {
    getTreeViews();
    setImmediate(() => {
        treeViews.forEach((treeView) => {
            if (treeView) {
                var blendingEl = document.createElement('div');
                var title = document.createElement('span');

                blendingEl.classList.add('tabBlender');
                blendingEl.appendChild(title);

                if (treeView && bool) {
                    if (treeView.querySelector('.tabBlender')) {
                        removeBlendingEl();
                    }
                    treeView.insertBefore(blendingEl, treeView.firstChild);
                } else if (treeView && !bool) {
                    removeBlendingEl();
                } else if (!treeView && bool) {
                    if (atom.packages.getActivePackage('tree-view') || atom.packages.getActivePackage('Remote-FTP') || atom.packages.getActivePackage('nuclide')) {
                        return setTimeout(() => {
                            toggleBlendTreeView(bool);
                            setImmediate(() => amuBindings.apply());
                        }, 2000);
                    }
                }
            }
        });
    });
}

export default { toggleBlendTreeView }