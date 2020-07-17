/* All customers from United States */
SELECT * from customers
WHERE Country = "United States"

/* All customers whose details were not updated from their creation on */
SELECT * from customers
WHERE id in (SELECT Customer_id
                WHERE Created_at = Updated_at)

/* The average customer age per country */
SELECT avg(age), country FROM customers
INNER JOIN customer_details ON customers.id = customer_details.Customer_id
GROUP BY country;
