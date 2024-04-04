import React, { FC, useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { selectProductDetails } from "../../redux/productSlice";
import { Sale, SortIndicatorProps } from "../../utils/types";
import "./SalesTable.css";
import { useAppSelector } from "../../redux/hooks";

const SortIndicator: React.FC<SortIndicatorProps> = React.memo(
  ({ field, sortField, sortDirection, onSort }) => {
    return (
      <IconButton onClick={() => onSort(field)} size="small">
        {sortField === field ? (
          sortDirection === "asc" ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </IconButton>
    );
  }
);

export const SalesTable: FC = () => {
  const productDetails = useAppSelector(selectProductDetails);
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [sortField, setSortField] = useState<string>("weekEnding");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (productDetails?.sales) {
      const sortedData = [...productDetails.sales].sort((a, b) => {
        const keyA = a[sortField];
        const keyB = b[sortField];
        if (keyA < keyB) return sortDirection === "asc" ? -1 : 1;
        if (keyA > keyB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
      setSalesData(sortedData);
    }
  }, [productDetails, sortDirection, sortField]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection((prevDirection) => {
        const newDirection = prevDirection === "asc" ? "desc" : "asc";
        return newDirection;
      });
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="sales-container">
      <TableContainer component={Paper}>
        <Table aria-label="sales table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                Week Ending
                <SortIndicator
                  field="weekEnding"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableCell>
              <TableCell>
                Retail Sales
                <SortIndicator
                  field="retailSales"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableCell>
              <TableCell>
                Wholesale Sales
                <SortIndicator
                  field="wholesaleSales"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableCell>
              <TableCell>
                Units Sold
                <SortIndicator
                  field="unitsSold"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableCell>
              <TableCell>
                Retailer Margin
                <SortIndicator
                  field="retailerMargin"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((sale: Sale) => (
              <TableRow key={sale.weekEnding}>
                <TableCell
                  component="th"
                  scope="row"
                  className="salesTableCell"
                >
                  {sale.weekEnding}
                </TableCell>
                <TableCell className="salesTableCell">
                  {sale.retailSales}
                </TableCell>
                <TableCell className="salesTableCell">
                  {sale.wholesaleSales}
                </TableCell>
                <TableCell className="salesTableCell">
                  {sale.unitsSold}
                </TableCell>
                <TableCell className="salesTableCell">
                  {sale.retailerMargin}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
