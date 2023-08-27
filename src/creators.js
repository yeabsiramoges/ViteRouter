import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getCreators(query) {
  await fakeNetwork(`getCreators:${query}`);
  let creators = await localforage.getItem("creators");
  if (!creators) creators = [];
  if (query) {
    creators = matchSorter(creators, query, { keys: ["first", "last"] });
  }
  return creators.sort(sortBy("last", "createdAt"));
}

export async function createCreator() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let creator = { id, createdAt: Date.now() };
  let creators = await getCreators();
  creators.unshift(creator);
  await set(creators);
  return creator;
}

export async function getCreator(id) {
  await fakeNetwork(`creator:${id}`);
  let creators = await localforage.getItem("creators");
  let creator = creators.find(creator => creator.id === id);
  return creator ?? null;
}

export async function updateCreator(id, updates) {
  await fakeNetwork();
  let creators = await localforage.getItem("creators");
  let creator = creators.find(creator => creator.id === id);
  if (!creator) throw new Error("No creator found for", id);
  Object.assign(creator, updates);
  await set(creators);
  return creator;
}

export async function deleteCreator(id) {
  let creators = await localforage.getItem("creators");
  let index = creators.findIndex(creator => creator.id === id);
  if (index > -1) {
    creators.splice(index, 1);
    await set(creators);
    return true;
  }
  return false;
}

function set(creators) {
  return localforage.setItem("creators", creators);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
