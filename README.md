# Excel Parser

This project was built to parse the given excel file of a given specific format (Check data folder for the excel data format).

## Some features to observe

In the project a user can:

1. Approve individual row or multiple rows and then approve.
2. Reject selected rows with some remark. On reject, user can enter a remark stating the reason behind rejecting the row.


## For Reference

1. Click on "Choose File" button to upload the given excel sheet.
2. User can select the row(s) by selecting on the checkbox.
3. On selection, user can decide either to approve or to reject.
4. if approved, then the state of the table will be updated with the updated values on "Status" column.
5. If rejected, then the user will be required to enter the remark stating the reason behind rejection on entering of which the states of "Status" and "Remark" columns will be updated.

Note: Users can also watch the logs in the console obsrving the change of events happening by clicking on either "Approve" or "Reject".

## How to get started:
- Install [Yarn](https://yarnpkg.com/).


## Installation:

Use the package manager [yarn](https://yarnpkg.com/) to install packages.
Install the dependencies and devDependencies and start the server.

```bash
yarn
