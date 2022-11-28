import React from "react";

export default class LoadingState {
    constructor() {
        this.state = new Loading();
    }

    nextState() {
        this.state = this.state.next();
    }
}

class LoadingStatus {
    constructor(name, nextStatus) {
        this.name = name;
        this.nextStatus = nextStatus;
    }

    next() {
        return new this.nextStatus();
    }
}

class Loading extends LoadingStatus {
    constructor() {
        super('loading', Ready)
    }
}

class Ready extends LoadingStatus {
    constructor() {
        super('ready', Ready)
    }
}