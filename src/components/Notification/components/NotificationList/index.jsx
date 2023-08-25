import "./notification-list.style.css";
import { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getNotificationQuery } from "../../notification.query";

export const NotificationList = () => {
  const gridRef = useRef(null);

  const [columnDefs] = useState([
    { field: "_id", minWidth: 20, filter: "agTextColumnFilter" },
    { field: "name", filter: "agTextColumnFilter", sortable: true },
    { field: "type", filter: "agTextColumnFilter", sortable: true },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const createServerSideDatasource = () => {
    return {
      getRows: async (params) => {
        let { filterModel, sortModel, startRow, endRow } =
          params?.request ?? {};

        console.log("request", params?.request);

        // untype data - serialize
        filterModel = JSON.stringify(filterModel ?? {});
        sortModel = JSON.stringify(sortModel ?? {});

        const notifications = await getNotificationQuery({
          startRow,
          endRow,
          filterModel,
          sortModel,
        });

        const rowData = notifications?.data?.getNotifications ?? [];
        params.success({ rowData });
      },
    };
  };

  const onGridReady = useCallback((params) => {
    const datasource = createServerSideDatasource();
    params.api.setServerSideDatasource(datasource);
  }, []);

  return (
    <div
      className="ag-theme-alpine notification-list-main"
      style={{ height: 500 }}
    >
      <AgGridReact
        enableCellChangeFlash={true}
        animateRows={true}
        ref={gridRef}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowModelType={"serverSide"}
        paginationPageSize={10}
        onGridReady={onGridReady}
        onStoreRefreshed={() => console.log("store refreshed")}
        pagination
      ></AgGridReact>
    </div>
  );
};
