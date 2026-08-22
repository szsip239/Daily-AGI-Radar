# Board Source is multi-valued for GitHub project signals

A GitHub project can appear on several ranking boards at once, and which boards surfaced it is worth keeping — it is the signal that distinguishes a project trending on GitHub itself from one that is being talked about across social platforms.

For GitHub project signals, `来源` records the Board Source and holds several values at once; when a project is already known and a second board surfaces it, the new board is unioned into the existing values rather than replacing them. Other signal types keep `来源` as the single-valued trigger mode.

Considered and rejected: adding a separate field for board provenance, which would leave two overlapping "where did this come from" fields; and adding each board as another single-select option, which cannot express a project that appears on two boards and would let whichever source ran last overwrite the other.
