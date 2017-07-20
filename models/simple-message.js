class SimpleMessage {
    constructor () {
        this.id = '';
        this.from = '',
        this.to = '',
        this.fromDisplayName = '',
        this.toDisplayName = '',
        this.type = 1,
        this.timeCreated = new Date(),
        this.content = '',
        this.originalContent = '',
        this.isSendBySelf = false
    }
}
