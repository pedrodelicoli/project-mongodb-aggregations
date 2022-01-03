db.trips.aggregate([
  {
    $project: {
      dia: { $dateToString: { format: "%d/%m/%Y", date: "$startTime" } },
      startTime: 1,
      stopTime: 1,
    },
  },
  {
    $match: {
      dia: "10/03/2016",
    },
  },
  {
    $group: {
      _id: "$dia",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos"] },
      _id: 0,
    },
  },
]);
