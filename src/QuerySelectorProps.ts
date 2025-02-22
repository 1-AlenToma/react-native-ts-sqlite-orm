export enum Param {
    StartParameter = "#(",
    EqualTo = "#=",
    EndParameter = "#)",
    OR = "#OR",
    AND = "#AND",
    LessThan = "#<",
    GreaterThan = "#>",
    IN = "#IN(",
    Not = "#NOT",
    NULL = "#IS NULL",
    NotNULL = "#IS NOT NULL",
    NotEqualTo = "#!=",
    Contains = "C#like",
    StartWith = "S#like",
    EndWith = "E#like",
    EqualAndGreaterThen = "#>=",
    EqualAndLessThen = "#<=",
    OrderByDesc = "#Order By #C DESC",
    OrderByAsc = "#Order By #C ASC",
    Limit = "#Limit #Counter",
    GroupBy = "#GROUP BY",
    InnerJoin = "#INNER JOIN",
    LeftJoin = "#LEFT JOIN",
    RightJoin = "#RIGHT JOIN",
    CrossJoin = "#CROSS JOIN",
    Join = "#JOIN",
    Max = "#MAX",
    Min = "#MIN",
    Count = "#COUNT",
    Sum = "#SUM",
    Total = "#Total",
    GroupConcat = "#GroupConcat",
    Avg = "#AVG",
    Between = "#BETWEEN",
    Value = "#Value",
    Concat = "#Concat",
    Union = "#UNION",
    UnionAll = "#UNION ALL",
    Case = "#CASE",
    When = "#WHEN",
    Then = "#THEN",
    Else = "#ELSE",
    EndCase = "#END"
}