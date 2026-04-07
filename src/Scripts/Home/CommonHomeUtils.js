const CommonHomeUtils = {
    saveCounter: function (count) {
        localStorage.setItem('homeCounter', count);
        console.log(`[HomeUtils] Saved count to localStorage: ${count}`);
    },

    getSavedCounter: function () {
        const val = localStorage.getItem('homeCounter');
        return val !== null ? parseInt(val, 10) : 0;
    }
};

export default CommonHomeUtils;