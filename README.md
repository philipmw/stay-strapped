# Stay Strapped #

## Vision

FIXME

## Algorithm

The key algorithm of this project is one that analyzes per-stroke data of a
workout and finds non-overlapping intervals of _steady state_.
A steady state interval is one of contiguous strokes having a constant power
output and heart rate.

Can we make this algorithm parallelizable?  Yes, if:

* there is an optimal substructure;
* the algo is stable in that once a stroke is categorized, it will always
  remain this category;
* two optimal substructures can be merged.

All indices in the following description are zero-based.

`IsLong(i, j)` returns TRUE iff the range `[i, j]` is sufficiently long to
be categorized steady-state if it met the other criteria.

`IsSteady(i, j)` returns TRUE iff `IsLong(i, j)` and all strokes in that
range have a uniform power and heart rate.

`SteadyIntervals(i, j)` returns a (possibly non-contiguous) list of
steady stroke intervals in the range [i, j).  In other words, for each
(x, y) in the returned list, `IsSteady(x, y)` is true.

Optimal substructure:

    0+ sets of: (Categorized)
      steady or excluded strokes
    0+ buffered strokes (PostBuffer)
 
Thus, each stroke is either _steady_ (part of a steady-state interval),
_excluded_ (decidedly not part of any steady-state interval), or _buffered_,
pending a categorization into the first two buckets.  Only edge strokes
of the analyzed workout can be in buffered state.

`RR(categorized, postbuffer, remainder)` defines a recurrence relation
for analyzing a workout.
It expects the optimal substructure in the first two parameters, followed by the remainder of, or unprocessed,
workout strokes.

Format of `RR` parameters:

* categorized: `[(i, j, c)]`, groups of contiguous strokes categorized as `c`;
* postbuffer: `(i, j)`, contiguous postbuffer strokes that are contiguous with
                        the last categorized interval;
* remainder: `(i, j)`, contiguous unprocessed strokes that are contiguous with
                       the postbuffer.

`RR` returns `categorized`.

    RR(categorized, postbuffer, remainder) = {
      // Base case
      if postbuffer=[] and remainder=[]:
        categorized
 
      if postbuffer=[]:
        // next stroke either continues the last steady-state interval,
        // or gets buffered.
        last_interval <- last(categorized)
        if IsSteady(last_interval|head(remainder)):
          add first stroke of remainder to last steady interval
          return RR(categorized+stroke, [], remainder - stroke)
        else:
          // move stroke from remainder to postbuffer
          return RR(categorized, [stroke], remainder - stroke)
 
      // we have something in the postbuffer, and maybe in the remainder
      if IsLong(postbuffer):
        // shit or get off the pot
        if IsSteady(postbuffer):
          return RR(categorized|(postbuffer, 's'), [], remainder)
        else:
          last_interval <- last(categorized)
          if IsExcluded(last_interval):
            // add the first stroke of postbuffer to excluded last interval
            return RR(categorized|last_interval+Head(postbuffer), Rest(postbuffer), remainder)
          else: // last interval is steady state
            // create a new excluded interval
            return RR(categorized|(Head(postbuffer), 'e'), Rest(postbuffer), remainder)
      else: // postbuffer is non-empty, but it is not long
        // we already know that the first stroke of postbuffer cannot
        // augment the last known steady state interval.
        if remainder=[]:
          // We've run out of course, and the buffer is too short to be
          // steady state.  Mark it excluded.
          return RR(categorized|postbuffer, 'e'), [], [])
        else:
          // move the stroke from remainder to postbuffer.
          return RR(categorized, postbuffer + stroke, remainder - stroke)
    }

## Run algorithm on a workout

Download the CSV of your workout from the Concept2 Online Log.

    npx tsc                                    # compile to `js` directory
    cd ts                                      # go into compiled code dir
    npx node cli.js {your-workout-filename}    # run program

## Development

Run unit tests:

    npx jest
    
Or use [Wallaby](http://www.wallabyjs.com) in your IDE.
(Tested with IntelliJ IDEA on macOS.)