import { debug, deleteElemFromArray, isSet, mydbg } from "./CommonFunctions";

export class EventRegister {
	evtListenersHm = {}
	evtName = '';
	static instances = {};

	constructor(evtName) {
		this.evtName = evtName;
		this.evtListenersHm[evtName] = [];
	}


	addListener(listener){
		var found = this.evtListenersHm[this.evtName].find( elem => {
  			return elem === listener;
		})
		if(found){
			if(debug) mydbg("listener already exist for: " + this.evtName)
			return;
		}
		this.evtListenersHm[this.evtName].push(listener);
	}

	remove(listener){
		deleteElemFromArray(listener, this.evtListenersHm[this.evtName]);
		if(this.evtListenersHm[this.evtName].length === 0){
			delete this.evtListenersHm[this.evtName];
			delete EventRegister.instances[this.evtName];
		}
	}


}

