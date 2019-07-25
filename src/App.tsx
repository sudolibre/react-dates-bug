import React from 'react';
import './App.css';
import matchSorter from 'match-sorter'
import {DateRangePicker, FocusedInputShape} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import {Moment} from "moment";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
const data = require("./generated_data.json");


interface State {
  startDate: Moment | null;
  endDate: Moment | null;
  focusedInput: FocusedInputShape | null;
  data: any[]
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      data: data
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter: any, row: any) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "Header1",
              columns: [
                {
                  Header: "Company",
                  accessor: "company",
                  filterMethod: (filter: any, row: any) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                },
                {
                  Header: "About",
                  id: "about",
                  accessor: "about",
                  filterMethod: (filter: any, rows: any) =>
                    matchSorter(rows, filter.value, { keys: ["lastName"] }),
                  filterAll: true
                }
              ]
            },
            {
              Header: "Date",
              columns: [
                {
                  Header: "Date",
                  accessor: "registered",
                  id: "date",
                  Filter: () => (
                    <div style={{ position: "absolute" }}>
                      <div style={{ position: "fixed" }}>
                        <DateRangePicker
                          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                          onDatesChange={({ startDate, endDate }) => this.setState({
                            startDate,
                            endDate
                          })} // PropTypes.func.isRequired,
                          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        />
                      </div>
                    </div>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default App;
