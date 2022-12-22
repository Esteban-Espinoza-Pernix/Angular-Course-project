import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

import Item from 'src/app/shared/item.model';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private firestore: Firestore) {}

  getItems() {
    const docRef = collection(this.firestore, 'Items');
    return collectionData(docRef, { idField: 'id' });
  }

  getItem(id_item: string) {
    const docRef = doc(this.firestore, 'Items', id_item);
    return getDoc(docRef);
  }

  addItem(newItem: Item) {
    const ItemRef = collection(this.firestore, 'Items');
    return addDoc(ItemRef, newItem);
  }

  updateItem(item: Item) {
    console.log(`Update Item.id: ${item.id}`);
    const itemRef = doc(this.firestore, `Items/${item.id}`);
    return setDoc(itemRef, { ...item });
  }

  deleteItem(itemId: string | undefined) {
    const ItemRef = doc(this.firestore, `Items/${itemId}`);
    return deleteDoc(ItemRef);
  }
}
