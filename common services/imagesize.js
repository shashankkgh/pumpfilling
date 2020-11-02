module.exports = {
    formatFileSize(bytes,decimalPoint) {
        if(bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
            if (i <= 2) return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
            else return null
    }
}