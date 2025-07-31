import {db} from "./firebase.js";

import {collection, getDocs, doc, getDoc, addDoc, deleteDoc} from "firebase/firestore";

const productsCollection = collection(db,"products");

export const getAllProducts = async () => {
    try{
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return products;
    } catch (error){
        console.error(error);
    }
};

export const getProductById = async (id) => {
    try {
        const docRef = doc(productsCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
};

export const createProduct = async (newProduct) => {
    try {
        const docRef = await addDoc(productsCollection, newProduct);
        return { id: docRef.id, ...newProduct };
    } catch (error) {
        console.error(error);
    }
};

export const updateProduct = async (id,updateProductData) => {
    try {
        const docRef = doc(productsCollection, id);
        await setDoc(docRef, updateProductData, {merge: true });
        return { id, ...updateProductData };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteProduct = async (id) => {
    try {
        const docRef = doc(productsCollection, id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export async function searchProductsByField(field, value) {
    try {
        const q = query(productsCollection, where(field, "==", value));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error){
        console.error(`Error al buscar los productos por ${field}:`,error);
        throw error;
    }
}