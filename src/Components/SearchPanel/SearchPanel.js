import React from 'react'
class SearchPanel extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            searchId : props.location.state.searchId
        }

        
    }
    // setMenuActiveState = () => {
    //     var pageId = document.getElementsByClassName("dashboard");
    //     if (pageId.length > 0) {
    //         document.getElementsByClassName('menu-heading-container')[0].classList.add('active');
    //         document.getElementsByClassName('menu-heading-container')[1].classList.remove('active');
    //     } else {
    //         document.getElementsByClassName('menu-heading-container')[0].classList.remove('active');
    //         document.getElementsByClassName('menu-heading-container')[1].classList.add('active');
    //     }
    // }


render() {
    return (

        <div className="searchPanel">
           
        <div>
            <ul>
                <li>{this.state.searchId}</li>
                <li>Aradhya</li>
            </ul>
        </div>
        </div>

    )
}
}

export default SearchPanel;