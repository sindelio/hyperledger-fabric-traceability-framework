'use strict';

/**
 * Possible asset states
 */
const state = {
	INITIAL: 'INITIAL',
	INTERMEDIARY: 'INTERMEDIARY',
	FINAL: 'FINAL',
};

/**
 * Asset class extends State class
 */
class Asset {
	
	constructor(assetKey, assetInfo) {
		this.contractNamespace = 'traceabilitysc.asset';
		this.key = assetKey;
		this.currentState = null;
		Object.assign(this, assetInfo);
	}

	/**
	 * Getters and setters
	*/
	getAsset() {
		return this;
	}

	setAsset(newData){
		Object.assign(this, newData);
	}

	getStatus(){
		return this.currentState;
	}

	static getContractNamespace() {
		return 'traceabilitysc.asset';
	}

	/**
	 * Methods to encapsulate asset state changes
	 * And query about a specific status
	 */

	setInitial() {
		this.currentState = state.INITIAL;
	}

	isInitial(){
		return this.currentState === state.INITIAL;
	}

	setIntermediary() {
		this.currentState = state.INTERMEDIARY;
	}

	isIntermediary(){
		return this.currentState === state.INTERMEDIARY;
	}

	setFinal() {
		this.currentState = state.FINAL;
	}

	isFinal(){
		return this.currentState === state.FINAL;
	}
	
}

module.exports = Asset;
