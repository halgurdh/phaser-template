class Composable {
    addComponent(componentname, ...args){
        componentname.call(this,...args);
        return this;
    }
}

export default Composable;