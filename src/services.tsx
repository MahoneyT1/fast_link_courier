/**
 * Services Module
 */
import { auth, db } from "./firebase";
import { doc, setDoc, getDocs, collection, addDoc, serverTimestamp, query, where, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    deleteUser,
} from "firebase/auth";


// register user function
export const registerUser = async (email: string, password: string, name: string, phoneNumber: string, username: string) => {

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredentials.user

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: user.email,
            phoneNumber: phoneNumber,
            username: username,
            created: new Date()
        })
        return userCredentials
    } catch (err) {
        throw new Error(String(err));
    }
};

// login user function
export const loginUser = async (email: string, password: string) => {
   
        try {          
    
            // Now attempt password login
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;

        } catch (error: any) {

            // Firebase-specific errors
            if (error.code === "auth/wrong-password") {
                throw new Error("Incorrect password. Please try again.");
            }

            if (error.code === "auth/invalid-email") {
                throw new Error("Enter a valid email address.");
            }

            if (error.code === "auth/user-disabled") {
                throw new Error("This account has been disabled.");
            }

            // Custom errors thrown from above
            throw new Error(error.message || "Login failed. Please try again.");
    }
};

// logout user function
export const logoutUser = async () => {
    return await signOut(auth);
};

// update user email function
export const updateUserEmail = async (newEmail: string) => {
    if (auth.currentUser) {
        return await updateEmail(auth.currentUser, newEmail);
    } else {
        throw new Error("No user is currently signed in.");
    }
};

// update user password function
export const updateUserPassword = async (newPassword: string) => {
    if (auth.currentUser) {
        return await updatePassword(auth.currentUser, newPassword);
    } else {
        throw new Error("No user is currently signed in.");
    }
};

// delete user function
export const deleteUserAccount = async () => {
    if (auth.currentUser) {
        return await deleteUser(auth.currentUser);
    } else {
        throw new Error("No user is currently signed in.");
    }
};
export const getPackage = async (id: string) => {
    const packageRef = doc(db, "packages", id); // reference to a specific package
    const packageSnap = await getDoc(packageRef);

    if (packageSnap.exists()) {
        return { id: packageSnap.id, ...packageSnap.data() };
    } else {
        console.log("No such package!");
        return null;
    }
};

export const updatepackage = async ( 
    id: string,
    updates: Record<string, any> = {}) => {
    try {
        await setDoc(doc(db, 'packages', id),
            {...updates, updatedAt: new Date() }, 
            { merge: true });
    } catch (error) {
        throw error;
    }
};



export const submitPackage = async (data: any) => {
    try {
        await addDoc(collection(db, 'packages'), {
            ...data,
            status: data.status || 'pending',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        throw new Error(String(error))
    }
};

export const getUserPackages = async () => {
    const user = auth.currentUser;

    if (!user) return [];

    const q = query(
        collection(db, "packages"),
        where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// get all packages request information
export const getAllPackages = async ()=> {

    const snapshot = await getDocs(collection(db, 'packages'))
    
    return snapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || null,
            updatedAt: data.updatedAt?.toDate() || null
        };
    });
}

export const updatePackageStatus = async (id: string, status: string) => {
    try {
        const leaveRef = doc(db, "packages", id); // reference to the document
        await updateDoc(leaveRef, {
            status: status,
        });
        return true;

    } catch (err) {
        throw new Error()
    }

};


export const deletePackage = async (id: string) => {
    try {
        const packageRef = doc(db, "packages", id);
        await deleteDoc(packageRef);
        return true;
    } catch (err) {
        throw new Error("Failed to delete package");
    }
};


export const updatePaidStatus = async (id: string, paid: boolean) => {
    try {
        await updateDoc(doc(db, "packages", id), {
            paid,
        });
        alert("Payment status updated");
    } catch (err) {
        console.error(err);
        alert("Not authorized");
    }
};

export const updatePackagePrice = async (id: string, totalPrice: number) => {
    try {
        await updateDoc(doc(db, "packages", id), {
            totalPrice,
        });
        alert("Package price updated");
    } catch (err) {
        console.error(err);
        alert("Failed to update package price");
    }
};