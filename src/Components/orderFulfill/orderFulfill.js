import React, { Component } from 'react';
import $ from 'jquery';
import './orderFulfill.css';
import TickSign from '../../Assets/group-8.png';

export class OrderFulfillViz extends Component {

  constructor(props){
    super(props);
    this.state = {
      appData:{
        "weeklyTotalCount":"0", 
        "weeklyCount":"0",
        "dailyTotalCount":"0",
        "dailyCount":"0"
      }
    }
  }

  static getDerivedStateFromProps(props){
    return {
      appData:props.orderFullfillmentData
    }
  }

  handleLoad(){
    var lineWeeklyPercent = (this.state.appData.weeklyCount / this.state.appData.weeklyTotalCount) * 100;
    var lineDailyPercent = (this.state.appData.dailyCount / this.state.appData.dailyTotalCount) * 100;
    var lineWeeklyGradient = 'linear-gradient(to right,#388d3c '+ lineWeeklyPercent+'%,#D6DCE0 0%,#D6DCE0 100%)';
    var lineDailyGradient = 'linear-gradient(to right,#388d3c '+ lineDailyPercent+'%,#D6DCE0 0%,#D6DCE0 100%)';
    var circleWeeklyColor = (lineWeeklyPercent / 25);   
    var fakelineWeekly = document.createElement('div');
    fakelineWeekly.className = "lineWeekly";
    fakelineWeekly.id = "line";
    $(fakelineWeekly).css({
      'width' : '100%',                
      'height' : '3px',
      'background-color': '#388d3c',
      'clear' : 'both',
      'margin-top' : '0px',
      'margin-bottom' : '35px',
      'background' :  lineWeeklyGradient
    });
    for(var i = 0; i<5; i++)
    {               
      var weeklyCircle = document.createElement('div');
      weeklyCircle.className = "circle";                
      if(i == 4)
      {
        weeklyCircle.className = "greyLastCircle";
      }
      $(weeklyCircle).appendTo(fakelineWeekly);                
      if(i <= circleWeeklyColor)
      {
        weeklyCircle.className = "circle";                    
        if(i == 4)
        {
          weeklyCircle.className = "lastCircle";
        }  
      }

      if(i == 0 && circleWeeklyColor == 0)
      {
        weeklyCircle.className = "circle";                    
        if(i == 4)
        {
          weeklyCircle.className = "greyLastCircle";
        }  
      }
    }
    
                
    var fakelineDaily = document.createElement('div');
    fakelineDaily.className = "lineDaily";
    fakelineDaily.id = "lineDaily";
    $(fakelineDaily).css({
      'width' : '100%',                
      'height' : '3px',
      'background-color': '#388d3c',
      'clear' : 'both',
      'margin-top' : '23px',
      'margin-bottom' : '0px',
      'background' :  lineDailyGradient
    });
    var dailyCircle = document.createElement('div');
    dailyCircle.className = "circle";
    var dailyLastCircle = document.createElement('div');
    dailyLastCircle.className = "greyLastCircle";
    if((lineDailyPercent > 0) && (lineDailyPercent <100))
    {
      dailyCircle.className = "circle";    
    }
    if(lineDailyPercent == 100)
    {
      dailyCircle.className = "circle"; 
      dailyLastCircle.className = "lastCircle";   
    }
    $(dailyCircle).appendTo(fakelineDaily);
    $(dailyLastCircle).appendTo(fakelineDaily);
    
    $( "#fakelineweekly" ).html(fakelineWeekly);            
    $( "#fakelinedaily" ).html(fakelineDaily);
  }
  
  componentDidMount() {
    this.handleLoad();          
  }

  componentWillUnmount() {
      this.handleLoad();				
  }

  render() {
    var tmp = this.state.appData;
    return (
      <div className="mainDiv" id="orderFulfilldiv">
        <div className="component_hd xs-mb-15"><img className="xs-mr-10" src = {TickSign}/><span className="order-fulfill-text">Order Fulfillment</span></div>
        <div id = "orderfulfillWeeklyWrapper" style={{clear: 'both'}}>
          <div id = "weeklyOrdersAll" className="orders_all">
            <div id = "weekly_order_name" className="order_name">WEEKLY ORDERS</div>
            <div id="pending_orders_weekly" className="pending_orders">
              <label className="no_of_orders">{tmp.weeklyCount}</label><label className="tot_pend_ordrs"><p>/  {tmp.weeklyTotalCount}</p></label> <label className="total_orders">orders completed</label>
            </div> 
            <div id = "fakelineweekly"></div>
          </div>	
        </div>	
        <div id = "orderfulfillDailyWrapper" style={{clear: 'both'}}>	
          <div id = "dailyOrdersAll" className="orders_all">	
            <div id = "daily_order_name" className="order_name">DAILY ORDERS</div>
            <div id = "pending_orders_daily" className="pending_orders">
              <label className="no_of_orders">{tmp.dailyCount}</label><label className="tot_pend_ordrs">/  {tmp.dailyTotalCount}</label> <label className="total_orders">orders completed</label>
            </div>
            <div id = "fakelinedaily"></div>
          </div>	
        </div>
      </div>
    );
  }
}

export default OrderFulfillViz;

