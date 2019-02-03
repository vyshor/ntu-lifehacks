import db from '@/fb.js';

export default {
    data() {
        return {

        }
    },
    methods: {
        getDocs: function (collectionName) {
            let docRef = db.collection(collectionName);

            return docRef.get(); // return the promise
        }
    }
}