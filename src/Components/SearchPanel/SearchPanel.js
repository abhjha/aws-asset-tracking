import React from 'react';
import ZoneDetailPopup from '../ZoneDetailPopup/ZoneDetailPopup'
import searchIcon from './searchIcon.png';

class SearchPanel extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            zoneId : props.location.state.zoneId,
            filteredMaterialData:[],
            materialName:"",
            isModalOpen: false,
            uniqueValues: [],
            searchResults: []
        }

        
    }
    closeModal= () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
          
        })

    }
    // setMenuActiveState = () => {
    //     var pageId = document.getElementsByClassName("dashboard");
    //     if (pageId.length > 0) {
    //         document.getElementsByClassName('menu-heading-container')[0].classList.add('active');
    //         document.getElementsByClassName('menu-heading-container')[1].classList.remove('active');
    //     } else {
    //         document.getElementsByClassName('menu-heading-container')[0].classList.remove('active');
    //         document.getElementsByClassName('menu-heading-container')[1].classList.remove('active');
    //         document.getElementsByClassName('menu-heading-container')[2].classList.add('active');
    //     }
    // }
    triggerZoneViewTable = () => {
        this.setState({loading:true})
        fetch(`https://iy78q5dt50.execute-api.us-west-2.amazonaws.com/Stage/GetMaterialHistory?zoneId=zone001`)
          .then(resp => resp.json())
          .then(response => {
              var arr = [];
              var newArr = [];
              for(var i=0;i<response.SelectedZone.length;i++)
              {
                arr.push(response.SelectedZone[i].materialName);
              }
              newArr = arr.filter((v, i, a) => a.indexOf(v) === i); 

            this.setState({
              loading: false,
              filteredMaterialData: response.SelectedZone,
              materialName: response.SelectedZone[0].materialName,
              uniqueValues: newArr,
              searchResults: newArr
            })
          })
      }
    
      componentDidMount = () => {
        this.triggerZoneViewTable();
        clearInterval(this.triggerZoneViewTable);
        setInterval(this.triggerZoneViewTable, 30000);
      }
      FilterSearchResults=(e)=>{

        var  k=0, check;
        var searchResults2=[];
        let value= e.target.value.toLowerCase();
        console.log(value);
        var noOfObjects=this.state.uniqueValues.length;
        var lengthOfString=value.length;
        for(var i =0; i<noOfObjects;i++)
        {
            var elem = this.state.uniqueValues[i];
          
            elem = elem.toLowerCase();
            
            check = 0;
            for(var j=0;j<lengthOfString;j++)
            {
                if(elem[j]!==value[j])
                {
                    check=1;
                    break;
                }
            }
            if(check===0)
            {
                searchResults2[k]=this.state.uniqueValues[i];
                k++;
            }
        }
        this.setState({
            searchResults: searchResults2
        })
        

      }

render() {
    return (

        <div className="searchPanel">
            <div className="SearchContainer">
                <input type="text" placeholder="Search by materials.." id="searchBox" onKeyUp={this.FilterSearchResults}>
                    
                </input>
                <div className="search-icon">
                    <img src={searchIcon} alt="searchIcon"></img>
                </div>
            </div>
           
           
        <div>
          
            <div className="material-list">
                {this.state.filteredMaterialData.length>0 && this.state.searchResults.map((item)=>{
                     return(
                    <div className="materials" onClick={this.closeModal}>{item}</div> 
                      )})}
                     {this.state.isModalOpen ? <ZoneDetailPopup popUpName={this.state.popUpName}
                    closeWindow={this.closeModal.bind(this)} /> : null}
 
                    </div>   
               
                
               
            
        </div>
        </div>

    )
}
}

export default SearchPanel;