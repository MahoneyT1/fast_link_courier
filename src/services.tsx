/**
 * Services Module
 */
import { auth, db } from "./firebase";
import { doc, setDoc, getDocs, collection, addDoc, serverTimestamp, query, where, updateDoc } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    deleteUser,
} from "firebase/auth";


// register user function
export const registerUser = async (email: string, password: string, name: string) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredentials.user

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: user.email,
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

export const getEmergency = async ()=> {
    const emergencyQuerry = await getDocs(collection(db, 'emergency'))
    const data = emergencyQuerry.docs.map(doc=> ({
        id: doc.id,
        ...doc.data()
    }))
    return data;
};

export const updateEmergency = async ( 
    id: string,
    updates: Record<string, any> = {}) => {
    try {
        await setDoc(doc(db, 'emergency', id),
            {...updates, updatedAt: new Date() }, 
            { merge: true });
    } catch (error) {
        throw error;
    }
};


export const getCompassionate = async () => {
    const compassionQuerry = await getDocs(collection(db, 'compassion'))
    const data = compassionQuerry.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return data;
};

export const updateCompassionate = async (
    id: string,
    updates: Record<string, any> = {}) => {
    try {
        await setDoc(doc(db, 'compassion', id),
            { ...updates, updatedAt: new Date() },
            { merge: true });
    } catch (error) {
        throw error;
    }
};

export const getHumanitarian = async () => {
    const humanitarianQuerry = await getDocs(collection(db, 'humanitarian'))
    const data = humanitarianQuerry.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return data;
};

export const updateHumanitarian = async (
    id: string,
    updates: Record<string, any> = {}) => {
    try {
        await setDoc(doc(db, 'compassion', id),
            { ...updates, updatedAt: new Date() },
            { merge: true });
    } catch (error) {
        throw error;
    }
};


export interface LeaveRequest {
    fullName: string;
    militaryId: string;
    email: string;
    phoneNumber: string;
    description: string;
    status?: string;
    userId: string;
    type: string;
}

export const submitLeaveRequest = async (data: LeaveRequest) => {
    try {
        await addDoc(collection(db, 'leave_requests'), {
            ...data,
            status: data.status || 'pending',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log("Leave request submitted successfully");
    } catch (error) {
        console.error("Error submitting leave request:", error);
    }
};

export const getUserLeaveRequests = async () => {
    const user = auth.currentUser;

    if (!user) return [];

    const q = query(
        collection(db, "leave_requests"),
        where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// get all leave request information
export const getAllLeaveRequest = async ()=> {

    const snapshot = await getDocs(collection(db, 'leave_requests'))
    
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

export const updateStatus = async (id: string, status: string) => {
    try {
        const leaveRef = doc(db, "leave_requests", id); // reference to the document
        await updateDoc(leaveRef, {
            status: status,
        });
        return true;

    } catch (err) {
        throw new Error()
    }
};